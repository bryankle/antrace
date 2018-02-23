import React, { Component } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import generateAntWinLikelihoodCalculator from '../utils/calculateWinningChance'


class AntRow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            winningChance: 0,
            calculated: false
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading && !this.state.calculated) {
            this.setState({ calculated: true })
            generateAntWinLikelihoodCalculator()(this.setWinningChances)
        }
    }

    setWinningChances = (winningChance) => {
        this.setState({
            winningChance
        })
        console.log("SET WINNING CHANCES")
        // console.log(this.props)
        this.props.updateWinningChance(winningChance, 1)
        this.props.incrementLoadedAnts();
    }

    displayWinningChance() {
        console.log("this.props.loading", this.props.loading)
        console.log("this.state.calculated", this.state.calculated)
        if (this.props.loading && this.state.calculated) return this.state.winningChance + "%"
        else if (!this.props.loading && !this.state.calculated) return "N/A"
        
    }


    render() {
        console.log(this.props)
    
        return (
            <Table.Row>
                <Table.Cell>{this.props.ant.name}</Table.Cell>
                <Table.Cell>{this.props.ant.color}</Table.Cell>
                <Table.Cell>{this.props.ant.length}</Table.Cell>
                <Table.Cell>{this.props.ant.weight}</Table.Cell>
                <Table.Cell>{this.displayWinningChance()}</Table.Cell>
            </Table.Row>
        )
    }
}

export default AntRow