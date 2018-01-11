// instantiate the Flux SDK with your appliation key
import { config } from './config.js';

// instantiate the Flux SDK with your appliation key
let sdk = new FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url })
let helpers = new FluxHelpers(sdk)
let user = null
let dataTables = {}

/**
 * Get the Flux user.
 */
function getUser() {
  if (!user) {
    user = helpers.getUser()
  }
  return user
}

/**
 * Get the user's Flux projects.
 */
function getProjects() {
  return getUser().listProjects()
}

/**
 * Get a project's data table.
 */
function getDataTable(project) {
  if (!(project.id in dataTables)) {
    let dt = getUser().getDataTable(project.id)
    dataTables[project.id] = { table: dt, handlers: {}, websocketOpen: false }
  }
  return dataTables[project.id]
}

/**
 * Get a list of the project's cells (keys).
 */
function getCells(project) {
  return getDataTable(project).table.listCells()
}

/**
 * Get a specific project cell (key).
 */
function getCell(project, cell) {
  return getDataTable(project).table.getCell(cell.id)
}

/**
 * Get the value contained in a cell (key).
 */
function getValue(project, cell) {
  return getCell(project, cell).fetch()
}

module.exports = {
  sdk,
  helpers,
  getCell,
  getCells,
  getDataTable,
  getProjects,
  getUser,
  getValue
}