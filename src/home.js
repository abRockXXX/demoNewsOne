import React from 'react'
import { View, Text, StyleSheet, FlatList, Picker, ActivityIndicator } from 'react-native'
import axios from 'axios'
import CardComponent from './components/ShortCardComponent'
import { Card, FAB, Title, Button } from "react-native-paper";
import Spinner from 'react-native-loading-spinner-overlay';
import credential from './constant/credential'

let countryList = [{
    key: 'in', value: 'India',
}, {
    key: 'us', value: 'United States',
}, {
    key: 'gb', value: 'United Kingdom',
}, {
    key: 'jp', value: 'Japan',
}, {
    key: 'ca', value: 'Canada',
}, {
    key: 'cn', value: 'China',
}];
let sortList = [{
    key: 'publishedAt', value: 'publishedAt',
}, {
    key: 'relevancy', value: 'relevancy',
}, {
    key: 'popularity', value: 'popularity',
},]
let categoryList = [
    {
        key: 'business', value: 'business',
    }, {
        key: 'entertainment', value: 'entertainment',
    }, {
        key: 'general', value: 'general',
    }, {
        key: 'health', value: 'health',
    }, {
        key: 'science', value: 'science',
    }, {
        key: 'sports', value: 'sports',
    }, {
        key: 'technology', value: 'technology',
    }
]

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            newsListInitial: [],
            country: 'in',
            category: 'business',
            sortBy: 'relevancy',
            spinner: true,
        }
    }

    async componentDidMount() {
        let result = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=100&${credential.apiKey}`)
        console.log(result.data.articles)
        this.setState({ newsListInitial: result.data.articles, spinner: false, totalPage: result.data.totalResults })
    }
    async shouldComponentUpdate(nextProps, nextState) {
        if (nextState.category !== this.state.category || nextState.country !== this.state.country || nextState.sortBy !== this.state.sortBy || nextState.isRefreshing) {
            try {
                let result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${nextState.country}&category=${nextState.category}&sortBy=${nextState.sortBy}&pageSize=100&${credential.apiKey}`)
                this.setState({ newsListInitial: result.data.articles, spinner: false, isRefreshing: false })
            } catch (error) {
                this.setState({ spinner: false, isRefreshing: false })
            }

        }
    }
    //RENDER ALL LIST IN PICKER
    renderCountryList = (list) => {
        return list.map((item, i) => {
            return < Picker.Item key={i} label={item.value} value={item.key} />
        })
    }
    renderCategoryList = (list) => {
        return list.map((item, i) => {
            return < Picker.Item key={i} label={item.value} value={item.key} />
        })
    }
    renderSortList = (list) => {
        return list.map((item, i) => {
            return < Picker.Item key={i} label={item.value} value={item.key} />
        })
    }

    //OPERATION ON FLATLIST
    renderFooter = () => {
        return (
            <Text style={{ padding: 10, paddingLeft: "38%", margin: 10, color: "white", backgroundColor: 'blue' }}>
                List Ended
            </Text>
            // <ActivityIndicator
            //     style={{ color: '#000', paddingBottom: 50 }}
            // />
        );
    };


    render() {
        return (
            <View style={{ padding: 10, margin: 10, paddingTop: -10, marginTop: -10 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    size="large"
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={[styles.header]}>
                    <Title style={styles.title}>News One</Title>
                    <View style={{ flexDirection: "row", height: 30, width: "100%" }} >
                        <Picker
                            selectedValue={this.state.country}
                            style={{ height: 30, width: 110 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ country: itemValue, spinner: true })
                            }>
                            {this.renderCountryList(countryList)}
                        </Picker>
                        <Picker
                            selectedValue={this.state.category}
                            style={{ height: 30, width: 110 }} onValueChange={(itemValue, itemIndex) =>
                                this.setState({ category: itemValue, spinner: true })
                            }>
                            {this.renderCategoryList(categoryList)}
                        </Picker>
                        <Picker
                            selectedValue={this.state.sortBy}
                            style={{ height: 30, width: 110 }} onValueChange={(itemValue, itemIndex) =>
                                this.setState({ sortBy: itemValue, spinner: true })
                            }>
                            {this.renderSortList(sortList)}
                        </Picker>
                    </View>
                </View>
                <FlatList
                    style={{ marginBottom: "15%" }}
                    data={this.state.newsListInitial}
                    renderItem={({ item }) =>
                        <CardComponent
                            fullData={item}
                            source={item.source}
                            author={item.author}
                            title={item.title}
                            publishedAt={new Date(item.publishedAt).toDateString()}//"10:00PM 08-12-2019"
                            linkurl={item.url}
                            urlToImage={item.urlToImage}
                            description={item.description} />
                    }
                    initialNumToRender={3}
                    keyExtractor={(item) => item.title + Math.random()}
                    //refreshing={isRefreshing}
                    //onRefresh={() => this.handleRefresh()}
                    //onEndReached={() => { this.handleLoadMore() }}//}
                    // onEndThreshold={0.01}
                    //onEndReachedThreshold={0.01}
                    ListFooterComponent={this.renderFooter}
                ////onSelect={() => this.onSelect()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 30,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    title: {
        fontSize: 30,
        color: "#6F00F8",
        marginTop: 13
    }
});
export default Home



