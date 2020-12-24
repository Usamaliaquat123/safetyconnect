import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import { connect } from 'react-redux';
import {sor} from '@service/mock';
import styles from './style';
import moment from 'moment';

import {Icon, Avatar} from 'react-native-elements';
import {colors} from '@theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export interface EditSORProps {}

export default class EditSOR extends React.Component<EditSORProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectP: false,
      selectL: false,
      observationT: '',
      obserLocation: '@Add Location',
      currentlocation: sor.Observation.locations[0],
      project: sor.Observation.projects[0],
      curTime: '',
      suggestions: [],
    };
  }

  filterLocation = (str: any) => {
    return str.match(/@\S+/);
  };
  searchInSuggestions = (
    str: string,
    strArray: Array<string>,
  ): Array<string> => {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].match(str)) return [strArray[j]];
    }
    return [];
  };
  extractLocation = (str: string) => {
    var location = this.filterLocation(str);
    if (location !== null) {
      this.setState({obserLocation: location[0].slice(1)});
    } else {
      this.setState({obserLocation: '@Add Location'});
    }
    var srchArr = this.searchInSuggestions(str, sor.Observation.suggestions);
    this.setState({suggestions: [...srchArr]});
    console.log(this.state.suggestions);
    this.setState({observationT: str});
  };

  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        curTime: moment().format('LT'),
        obserLocation: this.state.obserLocation
          ? this.state.obserLocation
          : '@Add Location',
      });
    }, 1000);
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headertle}>
              <Icon
                size={25}
                name="arrow-back-outline"
                type="ionicon"
                color={colors.secondary}
              />
              <View>
                <Text style={styles.title}>ABC Systems</Text>
                <View style={styles.underScrore} />
              </View>
              <View style={styles.avatarView}>
                <Avatar
                  rounded
                  source={{
                    uri:
                      'https://media-exp1.licdn.com/dms/image/C4D03AQG7BnPm02BJ7A/profile-displayphoto-shrink_400_400/0/1597134258301?e=1614211200&v=beta&t=afZdYNgBsJ_CI2bCBxkaHESDbTcOq95eUuLVG7lHHEs',
                  }}
                />
              </View>
            </View>
            <View style={styles.headerSelect}>
              {/* Project selector */}
              <View style={styles.leftSelector}>
                <Text style={styles.hselectort}> Project : </Text>
                <TouchableOpacity style={styles.selector}>
                  <Text style={styles.selectorBox}>{this.state.project}</Text>
                </TouchableOpacity>
                <Icon
                  onPress={() => {
                    this.setState({selectP: !this.state.selectP});
                    console.log('sdsd');
                  }}
                  style={{padding: 3}}
                  size={10}
                  name="down"
                  type="antdesign"
                  color={colors.secondary}
                />
                {this.state.selectP == true ? (
                  <View style={styles.slctContainer}>
                    {sor.Observation.projects.map((d) => (
                      <Text
                        onPress={() => this.setState({project: d})}
                        style={styles.itemH}>
                        {d.length > 7 ? d.substring(0, 8) + '...' : d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
              {/* Location selector */}

              <TouchableOpacity
                onPress={() => console.log('sds')}
                style={styles.rightSelector}>
                <Text style={styles.hselectort}> Location : </Text>
                <TouchableOpacity style={styles.selector}>
                  <Text style={styles.selectorBox}>
                    {this.state.currentlocation}
                  </Text>
                </TouchableOpacity>
                <Icon
                  style={{padding: 3}}
                  size={10}
                  name="down"
                  type="antdesign"
                  color={colors.secondary}
                />
                {this.state.selectL == true ? (
                  <View style={[styles.slctContainer, {left: wp(15)}]}>
                    {sor.Observation.locations.map((d) => (
                      <Text
                        onPress={() => this.setState({currentlocation: d})}
                        style={styles.itemH}>
                        {d.length > 7 ? d.substring(0, 7) + '...' : d}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.cnHeading}>Create New SOR</Text>
            {/* Observation Details */}
            <Text style={styles.observationT}>Observation Detail</Text>
            <View style={styles.observationDetail}>
              <Text style={styles.obserttle}>
                On {moment().format('MMMM DD')}, {moment().format('YYYY')} at
                about {this.state.curTime} it was observed that
              </Text>
              <TextInput
                multiline={true}
                value={this.state.observationT}
                underlineColorAndroid="transparent"
                placeholder="Enter your observation here"
                onChange={(t) => this.extractLocation(t.nativeEvent.text)}
                style={styles.obInputText}></TextInput>
              <Text style={styles.obText}>
                at{' '}
                <Text style={{color: colors.primary}}>
                  {this.state.obserLocation}
                </Text>{' '}
                and it happend at
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  style={{marginTop: wp(1)}}
                  size={15}
                  name="calendar-clock"
                  type="material-community"
                  color={'black'}
                />
                <Text
                  style={{
                    fontSize: wp(3),
                    fontWeight: 'bold',
                    marginTop: wp(1),
                    marginLeft: wp(1),
                  }}>
                  <Text style={{color: colors.primary}}>
                    {moment().format('MMMM DD, YYYY')}
                  </Text>{' '}
                  at about{' '}
                  <Text style={{color: colors.primary}}>
                    {moment().format('LT')}
                  </Text>
                </Text>
              </View>
            </View>
            {/* Suggestions  */}
            {this.state.suggestions.length != 0 ? (
              <View>
                <Text style={styles.suggHeading}>Suggestions</Text>
                <View style={styles.sugContainer}>
                  {this.state.suggestions.map((d: string) => (
                    <TouchableOpacity
                      onPress={() => this.setState({observationT: d})}
                      style={styles.sugItm}>
                      <Text style={styles.sugItmTxt}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}

            {/* Classify SOR */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EditSOR);
