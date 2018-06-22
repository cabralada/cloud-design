import React, { Component } from 'react';

import styled from 'styled-components';

class AppTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            current: ''
        }

        this.updateState = this.updateState.bind(this);
    }

    updateState(content) {
        let {data} = content;
        let {selected} = content;

        let filtering = data.filter((index) => {
            return index[selected]
        })

        this.setState({
            data : filtering[0][selected],
            current : selected
        })
    }


    shouldComponentUpdate(nextProps) {
        if (nextProps.selected === '') return false;

        if (nextProps.selected !== this.state.current) {
            this.updateState(nextProps);
        }

        return true;
    }

    render() {

        if (this.state.data.length === 0) {
            return (
                <Waiting>
                    <h2>Select a category</h2>
                </Waiting>
            );
        }

        return (
            <div>
                <h2 style={styleTitle}>
                    Detail from: <strong>{this.state.current} ({this.state.data.length})</strong>
                </h2>
                <ListItem>
                    {
                        this.state.data.map((index,key) => {
                            return (
                                <li key={key}>
                                    <span>{index.transactionId}</span>
                                    <p>{index.transactionDescription}</p>
                                </li>
                            )
                        })
                    }
                </ListItem>
            </div>
        )
    }
}

export default AppTransactions;

const styleTitle = {
    'margin': '3rem 0px 0px 0px',
    'fontSize': '1rem',
    'fontWeight': 'normal'
}

const Waiting = styled.div`
    background: #eee;
    padding: 2rem;
    margin-top: 5rem;
    color: #ccc;

    h2 {
        margin: 0;
        text-align: center;
    }
`;

const ListItem = styled.ul`
    margin: 1rem 0 0 0;
    padding: 0;
    max-height: 60vh;
    overflow: auto;

    li {
        list-style: none;
        border: 1px solid #ccc;
        margin-top: 1rem;
        margin-right: 10px;
        padding: .8rem;

        &:first-child {
            margin-top: 0
        }

        span {
            font-size: .7rem;
        }

        p {
            margin: 5px 0 0 0;
            font-size: .9rem;
            font-weight: bold
        }

        &:hover {
            background: #eee
        }
    }
`;