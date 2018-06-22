import React, { Component } from 'react';

import AppTransaction from './App-transactions';
import TagCloud from './TagCloud/TagCloud'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import transaction from './../assets/transactions.json';

class AppDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            matchValues : [],
            matchType : [],
            matches : [],
            totalFoundItens : 0
        }

        this.onMatchAllTransactions = this.onMatchAllTransactions.bind(this);
        this.onCountMatches = this.onCountMatches.bind(this);
        this.onSetMatchValues = this.onSetMatchValues.bind(this);
        this.onSetMatchType = this.onSetMatchType.bind(this);
        this.getCurrentPath = this.getCurrentPath.bind(this);
        this.prettify = this.prettify.bind(this);
    }

    onMatchAllTransactions(data) {
        if (data === '' || this.props.data.length === 0 ) return;

        let {props} = this;

        this.setState({
            matchValues: this.onSetMatchValues(props.data[data]),
            matchType: this.onSetMatchType(props.data[data])
        }, () => {
            let group = this.state.matchValues.map((index, item) => {

                let isEndWith = this.state.matchType[item] === 'endsWith';
                let isStartsWith = this.state.matchType[item] === 'startsWith';
                let isContains = this.state.matchType[item] === 'contains';

                let result = {};
                let matches = transaction.filter((type, key) => {

                    let strDescription = type.transactionDescription;
                    let strType = type.transactionDescription;

                    if (
                        typeof strDescription === 'undefined' ||
                        typeof strType === 'undefined'
                    ) return null;

                    if (isEndWith && strDescription.endsWith(index)) {
                        return strDescription;
                    }

                    if (isStartsWith && strDescription.startsWith(index)) {
                        return strDescription;
                    }

                    if (isContains && strDescription.includes(index)) {
                        return strDescription;
                    }

                    return matches;
                });

                result[index] = matches;
                return result;
            });

            this.setState({
                matches: group
            }, () => {
                let {matches} = this.state;
                this.setState({
                    totalFoundItens: this.onCountMatches(matches)
                })
            })
        })
    }

    onCountMatches(data) {
        let count = 0;

        data.map((index) => {
            for (var i in index) {
                count = count + index[i].length
            }
            return count;
        })

        return count;
    }

    onSetMatchValues(data) {
        let arrayMatchValue = [];

        data.map((index) => {
            arrayMatchValue = [...arrayMatchValue, index.ruleMatchValue];
            return arrayMatchValue
        });

        return arrayMatchValue;
    }

    onSetMatchType(data) {
        let arrayMatchType = [];

        data.map((index) => {
            arrayMatchType = [...arrayMatchType, index.ruleMatchType];
            return arrayMatchType;
        });

        return arrayMatchType;
    }

    getCurrentPath(location) {
        let path = location.pathname.split('/');
        let finalTxt = this.prettify(path[2]);
        return finalTxt;
    }

    prettify(str) {
        return str.replace(/(-|^)([^-]?)/g, function(_, prep, letter) {
            return (prep && ' ') + letter.toUpperCase();
        });
    }

    componentDidMount() {
        let {props} = this;

        if (props.currentCategory === '') {
            let location = this.getCurrentPath(props.location)
            props.getCategory(location);
        }

        if (typeof props.location.pathname !== 'undefined') {
            let currentPath = props.location.pathname;
            props.getUrl(currentPath);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.state.matchType.length === 0) {
            let location = this.getCurrentPath(nextProps.location)
            this.onMatchAllTransactions(location)
        }
        return true;
    }

    render() {
        let {props} = this;

        if (props.data.length === 0) {
            return <div>Loading ...</div>
        }

        const TotalMatches = () => {
            return (
                <div>
                    <Typography variant="title" color="inherit">
                        <strong>{props.currentCategory}</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Total matches: <strong>{this.state.totalFoundItens}</strong>
                    </Typography>
                </div>
            );
        }

        const NoneMatches = () => {
            return (
                <div style={NoneItemStyle}>
                    None item founded!!!
                </div>
            );
        }

        return (
            <Grid style={defaultStyle} container spacing={24}>
                <Grid item xs={12} sm={8}>
                    <TagCloud {...props} />
                </Grid>
                <Grid item xs={12} sm={4} style={transactionStyle}>
                    <TotalMatches/>

                    {
                        this.state.totalFoundItens === 0 ? 
                        <NoneMatches /> : 
                        <AppTransaction
                            data={this.state.matches}
                            selected={props.currentDetail}
                        />
                    }

                </Grid>
            </Grid>
        )
    }
}

export default AppDetail;

const transactionStyle = {
    borderLeft: '1px solid #eee',
    background: '#fafafa'
}

const defaultStyle = {
    textAlign: 'left'
}

const NoneItemStyle = {
    color: 'white',
    background: 'red',
    padding: '1rem',
    marginTop: '5rem'
}
