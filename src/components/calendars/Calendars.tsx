import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '@theme';
export interface CalendarsProps {
  currentDate: number;
}

class Calendars extends React.Component<CalendarsProps, any> {
  render() {
    return (
      <View style={{borderRadius: wp(10), backgroundColor: colors.primary}}>
        <Calendar
          theme={{
            textDayFontSize: wp(3),
          }}
          // Initially v  isible month. Default = Date()
          current={'2012-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2012-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day: any) => {}}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day: any) => {}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month: any) => {}}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          //   renderArrow={(direction) => <Arrow />}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth: any) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth: any) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          // disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.

          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendars);
