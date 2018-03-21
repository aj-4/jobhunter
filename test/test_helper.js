import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import React from 'react';
import chai, {expect} from 'chai';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

//use jsDOM for a 'fake' DOM environment in Node
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

//jquery will not attempt to find the dom
const $ = jquery(global.window);

//build renderComponent with React test utils
function renderComponent(ComponentClass, props, state) {
    const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
        <ComponentClass {...props}/>
    </Provider>
    );
    return $(ReactDOM.findDOMNode(componentInstance)); //produces HTML - wrap with jquery element
                                                        //this gives us access to the matchers from jquery chai
}

//build event simulation helper -- adds to all jQuery objects
$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
}

//setup chai jQuery
chaiJquery(chai, chai.util, $)

export {renderComponent, expect};