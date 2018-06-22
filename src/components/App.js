import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import styled from 'styled-components';

import { connect } from 'react-redux';
import { updateBaseData } from './../reducers/data-actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import TagCloud from './TagCloud/TagCloud';
import AppDetail from './App-detail';

import dataRules from './../assets/rules.json';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      currentPage: '',
      currentCategory: '',
      currentDetail: ''
    }

    this.onGetCurrentPage = this.onGetCurrentPage.bind(this);
    this.onGetCurrentCategory = this.onGetCurrentCategory.bind(this);
    this.onGetCurrentDetail = this.onGetCurrentDetail.bind(this);
  }

  onSetData () {
    let rulesArrayCat = [];

    rulesArrayCat = dataRules.reduce((group, item) => {
        if (item.ruleFlag === 'Neutral') return group;
        group[item.ruleCategory] = group[item.ruleCategory] || [];
        group[item.ruleCategory].push(item)
        return group;
    }, Object.create(null));

    this.props.onUpdateBaseData(rulesArrayCat)
    return rulesArrayCat;
  }

  onGetCurrentDetail(data) {
    this.setState({
      currentDetail: data === null ? '' : data.ruleMatchValue
    })
  }

  onGetCurrentCategory(data) {
    this.setState({
      currentCategory: data
    }, () => {
      this.onGetCurrentDetail(null)
    })
  }

  onGetCurrentPage(data) {
    if (
      typeof data !== 'undefined' && 
      data.indexOf('detail') >= 0
    ) {
      this.setState({
        currentPage: 'by Match'
      })
    } else {
      this.setState({
        currentPage: 'by Category'
      })
    }
  }

  componentDidMount() {
    this.onGetCurrentPage();

    this.setState({
      data: this.onSetData()
    })
  }

  render() {
    let {data} = this.state;

    if (Object.keys(data) === 0) {
      return <div>Preparing data ...</div>
    }

    const BackHome = () => {
      return (
        <Button 
          variant="contained"
          color="primary"
          component={Link}
          to='/'> 
            Back to Category
          </Button>
      )
    }

    return (
      <Router>
        <section>
          <AppBar position="static" style={StyleApp} color="default">
            <Toolbar>
              <Typography style={StyleAppTypo} variant="title" color="inherit">
                Transactions Cloud <strong>- {this.state.currentPage}</strong>
              </Typography>
              {
                this.state.currentPage === 'by Match' ?
                <BackHome /> : null
              }
            </Toolbar>
          </AppBar>

          <Master>
              <Switch>
                  <Route exact path="/"
                      render = {
                        (props) => <TagCloud
                                      getCategory = {this.onGetCurrentCategory}
                                      getUrl = {this.onGetCurrentPage}
                                      data = {data}
                                      {...props} />
                      }
                  />
                  <Route exact path="/detail/:id"
                      render = { (props) => <AppDetail
                                              {...this.state}
                                              getCategory = {this.onGetCurrentCategory}
                                              getDetail = {this.onGetCurrentDetail}
                                              getUrl = {this.onGetCurrentPage}
                                              {...props} /> } />
                  <Route component={NotFoundPage}/>
              </Switch>
          </Master>
        </section>
      </Router>
    );
  }
}

const NotFoundPage = ({match}) => (<div>Ops!! </div>);

const mapStateToProps = (state, props) => {
  return {
      data: state.data
  }
}

const mapActionsToProps = {
  onUpdateBaseData: updateBaseData
}

export default connect(mapStateToProps, mapActionsToProps) (App);

const StyleAppTypo = {
  'flex': '1'
}

const StyleApp = {
  'boxShadow': '0 0 0 0',
  'marginBottom': '2rem'
}

const Master = styled.section`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 2rem;
  text-align: center;
`;