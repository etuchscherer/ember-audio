import Ember from 'ember';
import { Oscillator } from 'ember-audio';
import { MusicalIdentity } from 'ember-audio/mixins';

// By mixing the MusicalIdentity mixin into the Oscillator class, we get an
// oscillator that is aware of it's frequency, letter, accidental, octave, etc...
const MusicallyAwareOscillator = Oscillator.extend(MusicalIdentity);

const {
  inject: { service },
  on,
  Controller
} = Ember;

export default Controller.extend({
  audio: service(),
  oscillators: null, // Put oscillators here after they're created

  initSynth: on('init', function() {
    const audio = this.get('audio');

    // Could also do `audio.createNoteArray(notes)` where notes is a POJO,
    // or `audio.load(URL).asNoteArray().then(...)` providing a URL to a JSON file
    const notes = audio.createNoteArray();

    // Slicing so that the keyboard isn't massive
    const slicedNotes = notes.slice(48, 60);

    // Create a MusicallyAwareOscillator instance for each note in slicedNotes
    const oscillators = slicedNotes.map((note) => {
      return MusicallyAwareOscillator.create({
        // By setting `frequency`, we get `identifier`, `name`, etc.. for free
        frequency: note.get('frequency'),
        // Default type is 'sine'
        type: 'square',
        // Oscillator instances need `audioContext` in order to make sound
        audioContext: audio.get('audioContext')
      });
    });

    this.set('oscillators', oscillators);
  }),

  actions: {
    startNote(note) {
      note.play();
    },

    stopNote(note) {
      if (note.get('isPlaying')) {
        note.stop();
      }
    }
  }
});
