const { Model } = require('objection');

class Notes extends Model {
  static get tableName() {
    return 'notes';
  }
}

module.exports = Notes;
