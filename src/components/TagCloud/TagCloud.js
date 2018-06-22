import React, { Component } from 'react';

import { Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import blueGrey from '@material-ui/core/colors/blueGrey';

class TagCloud extends Component {

    constructor(props) {
        super(props);
        this.onChangeStyle = this.onChangeStyle.bind(this);
    }

    onChangeStyle(type) {
        if (type === "Yellow"){
            return yellow[800]
        } else if (type === "Red") {
            return red[500]
        } else {
            return blueGrey[300]
        }
    }

    componentDidMount() {
        if (this.props.hasOwnProperty('location')) {
            let currentPath = this.props.location.pathname;
            this.props.getUrl(currentPath);
        }
    }

    render() {

        const InitGrid = () => {
            return (
                <Grid xs={12} sm={8} item>
                    <Typography style={styleLable} variant="title" color="inherit">
                        Select your category
                    </Typography>
                    {
                        Object.keys(this.props.data).map((index, item) => {

                            let str = index.replace(/\s+/g, '-').toLowerCase();
                            let url = `/detail/${str}`
                            let color = this.props.data[index][0].ruleFlag;
                            let gridBtn = {
                                            ...{styleBtn}.styleBtn,
                                            'backgroundColor': this.onChangeStyle(color)
                                        };

                            return (
                                <Button
                                    onClick={(e) => this.props.getCategory(index)}
                                    component={Link} to={url}
                                    key={item}
                                    variant="contained"
                                    style={gridBtn}
                                    size="large"
                                >
                                    {index}
                                </Button>
                            )
                        })
                    }
                </Grid>
            )
        }

        const DetailGrid = () => {
            return (
                <Grid xs={12} sm={8} item>
                    <Typography style={styleLable} variant="title" color="inherit">
                        Select your category - <strong style={{color: 'red'}}>{this.props.currentCategory}</strong>
                    </Typography>
                    {
                        this.props.data[this.props.currentCategory].map((index, item) => {
                            let color = index.ruleFlag;
                            let gridBtn = {...{styleBtn}.styleBtn, 'backgroundColor': this.onChangeStyle(color)};
                            if (color === 'Neutral') return null

                            return (
                                <Button
                                    key={item}
                                    style={gridBtn}
                                    size="large"
                                    onClick={(e) => this.props.getDetail(index)}
                                >
                                    {index.ruleMatchValue}
                                </Button>
                            )
                        })
                    }
                </Grid>
            )
        }

        return (
            <Grid
                container
                style={styleMaster}
                spacing={16}
                alignItems= 'center'
                direction='row'
                justify= 'center'
            >
                {
                    typeof this.props.currentCategory === 'undefined' ?
                    <InitGrid /> : <DetailGrid />
                }
            </Grid>
        )

    }
}

export default TagCloud;

const styleMaster = {
    height: 'calc(100vh - 120px)'
};

const styleBtn = {
    color : 'white',
    fontSize : '1.4rem',
    margin : '.5rem',
    fontWeight : 'bold'
}

const styleLable = {
    opacity: '.9',
    fontSize: '.8rem',
    marginBottom: '1rem'
}