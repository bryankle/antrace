import React, { Component } from 'react'
import { Container, Table, Button, Loader } from 'semantic-ui-react'
import Ant from './Ant'
import generateAntWinLikelihoodCalculator from '../utils/calculateWinningChance'


class AntList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            antsFinishedLoading: 0,
            ants: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ants: nextProps.ants
        })
    }

    setLoadingTrue() {
        this.setState({
            loading: true
        })
    }

    incrementLoadedAnts = () => {
        this.setState({
            antsFinishedLoading: this.state.antsFinishedLoading + 1
        })
    }

    endCalculations = () => {
        return function() {
            this.setState({
                loading: false,
                antsFinishedLoading: 0
            })
        }
    }

    updateWinningChance = (winningChance, id) => {
        let ants = Array.prototype.slice(this.state.ants)
        ants[id]['winningChance'] = winningChance
        this.setState({
            ants
        })
    }

    renderRowsInitial = (allAnts) => allAnts.map((antData, idx) => (
        <Ant
            key={idx}
            loading={this.state.loading}
            incrementLoadedAnts={this.incrementLoadedAnts}
            ant={antData}
            updateWinningChance={this.updateWinningChance}
        />))

    render() {
        console.log("this.state.ants", this.state.ants)

        if (this.state.antsFinishedLoading === this.props.ants.length) {
            console.log("Checking ants finished loading and total ants")
            this.endCalculations();
        }
        console.log('ants finished loading: ', this.state.antsFinishedLoading)
        console.log("STATE", this.state)
        return (
            <Container>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Color</Table.HeaderCell>
                            <Table.HeaderCell>Length</Table.HeaderCell>
                            <Table.HeaderCell>Weight</Table.HeaderCell>
                            <Table.HeaderCell>Winning Chances</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderRowsInitial(this.state.ants)}
                    </Table.Body>
                </Table>
                <Button
                    disabled={this.state.loading ? true : false}
                    onClick={() => this.setLoadingTrue()}
                >Calculate winning chances</Button>
            </Container>
        )
    }
}


export default AntList