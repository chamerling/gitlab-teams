export const getProject = ({ projects }) => id => projects[id];

export const isConfigured = state => !!state.apiToken;
