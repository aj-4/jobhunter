import {renderComponent, expect} from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
    let component;

    beforeEach(() => {
        const props = { comments: ['comment 1', 'comment 2']};
        component = renderComponent(CommentList, null, props);
    });

    it('shows an LI for each comment', () => {
        expect(component.find('li').length).to.equal(2);
    });

    it('shows each comment that is provided', () => {
        expect(component).to.contain('comment 1');
        expect(component).to.contain('comment 2');
    });

});