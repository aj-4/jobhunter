import moment from 'moment';

export const getBucketDayMonthTrends = (bucketData) => {
    const workflowsUpdatedDaysAgo = [];
    const workflowsUpdatedWeeksAgo = [];
    const workflowDaysAgoSizes = [];
    const workflowWeeksAgoSizes = [];

    bucketData.forEach(bucket => {
      let date = new Date(bucket.updatedAt);
      let dayStamp = moment(date).startOf('day').fromNow();
      let dayParsed = dayStamp.split(' ');

      // if it was updated today
      if (
        dayParsed[1] === 'hours' || dayParsed[1] === 'hour' ||
        dayParsed[1] === 'minutes' || dayParsed[1] === 'minute'
      ) {

        if (!workflowsUpdatedDaysAgo[0]) {
          workflowsUpdatedDaysAgo[0] = [];
        }
        workflowsUpdatedDaysAgo[0].push(bucket);

        if (!workflowDaysAgoSizes[0]) {
            workflowDaysAgoSizes[0] = 1;
        } else {
            workflowDaysAgoSizes[0]++;
        }

        if (!workflowWeeksAgoSizes[0]) {
            workflowWeeksAgoSizes[0] = 1;
        } else {
            workflowWeeksAgoSizes[0]++;
        }

      } else if (dayParsed[1] === 'days' || dayParsed[1] === 'day') {

        // if it was updated this week
        let daysAgo = dayParsed[0];
        if (!workflowsUpdatedDaysAgo[daysAgo]) {
          workflowsUpdatedDaysAgo[daysAgo] = [];
        }
        workflowsUpdatedDaysAgo[daysAgo].push(bucket);

        if (!workflowDaysAgoSizes[daysAgo]) {
            workflowDaysAgoSizes[daysAgo] = 1;
        } else {
            workflowDaysAgoSizes[daysAgo]++;
        }

        if (!workflowWeeksAgoSizes[0]) {
            workflowWeeksAgoSizes[0] = 1;
        } else {
            workflowWeeksAgoSizes[0]++;
        }

      } else {

        // if it's weeks ago or greater
        let weeksAgo = dayParsed[0];
        if (!workflowsUpdatedWeeksAgo[weeksAgo]) {
          workflowsUpdatedWeeksAgo[weeksAgo] = [];
        }
        workflowsUpdatedWeeksAgo[weeksAgo].push(bucket);

        if (!workflowWeeksAgoSizes[weeksAgo]) {
            workflowWeeksAgoSizes[weeksAgo] = 1;
        } else {
            workflowWeeksAgoSizes[weeksAgo]++;
        }

      }
    })

    return {
        workflowsUpdatedDaysAgo,
        workflowDaysAgoSizes,
        workflowsUpdatedWeeksAgo,
        workflowWeeksAgoSizes
    }
}

export const getDailyUpdateVolume = (daysAgoSizes) => {
    for (let i = 0; i < 7; i++) {
        daysAgoSizes[i] = daysAgoSizes[i] || 0
    }
    return daysAgoSizes.reverse();
};

export const getWeeklyUpdateVolume = (weeksAgoSizes) => {
    for (let i = 0; i < 6; i++) {
        weeksAgoSizes[i] = weeksAgoSizes[i] || 0
    }
    return weeksAgoSizes.reverse();
}
