import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import { fetchGame, updateGame } from '../actions/current_game';

class GameEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.name,
      title: '',
      abbrevation: '',
      start_date: ''
    }

    this.props.fetchGame(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;
    this.setState({
      title: game.title,
      abbrevation: game.abbrevation,
      start_date: game.start_date
    })
  }

  onFormSubmit = () => {
    const start_date = moment(this.state.start_date, "DD/MM/YYYY").format();
    this.props.updateGame(this.props.game.id, {
      ...this.state,
      start_date
    });
  }

  onGameTitleChange = event => {
    this.setState({title: event.target.value});
  }

  onAbbChange = event => {
    this.setState({abbrevation: event.target.value});
  }

  onDateChange = value => {
    this.setState({start_date: value});
  }

  render() {
    if (!this.props.game) {
      return null
    }
    
    return (
      <Box align='center'
         pad={{"vertical": "medium"}}>
        <Form>
          <Header>
            <Heading>
              Update game
            </Heading>
          </Header>
          <FormField label='Game Name'>
            <TextInput onDOMChange={this.onGameTitleChange}
              value={this.state.title}/>
          </FormField>
          <FormField label='Abbrevation'>
            <TextInput onDOMChange={this.onAbbChange}
              value={this.state.abbrevation}/>
          </FormField>
          <FormField label='Start date'>
            <DateTime format='DD/MM/YYYY'
              onChange={this.onDateChange}
              value={this.state.start_date} />
          </FormField>
          <Footer pad={{"vertical": "medium"}}>
            <Button onClick={this.onFormSubmit} label='Add' type='submit' primary={true} />
            <Box pad={{"horizontal": "medium"}}>
              <Button path={`/games/${this.props.game.id}`} label='Cancel' type='button' />
            </Box>
          </Footer>
        </Form>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.currentGame.game
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGame, updateGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEdit)