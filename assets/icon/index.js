const EVENT_TYPE = {
  get EVENT_TYPE_ART () {
    return require('./event_type_art.js').default
  },
  get EVENT_TYPE_CULTURE () {
    return require('./event_type_culture.js').default
  },
  get EVENT_TYPE_SOCIAL () {
    return require('./event_type_social.js').default
  },
  get EVENT_TYPE_URBAN () {
    return require('./event_type_urban.js').default
  },
}

module.exports = {
  ...EVENT_TYPE,
}