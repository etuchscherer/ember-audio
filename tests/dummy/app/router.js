import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('soundfonts', function() {
    this.route('notes');
  });
  this.route('audio-files', function() {
    this.route('simple', { path: '/' });
    this.route('mp3-player');
    this.route('mp3-player-code');
    this.route('drum-kit');
  });
  this.route('audio-routing');
  this.route('timing', function() {
    this.route('drum-machine');
    this.route('with-ember-audio');
  });
});

export default Router;