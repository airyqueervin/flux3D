// instantiate the Flux SDK with your appliation key
import { config } from './config.js';

var sdk = new FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url })
var helpers = new FluxHelpers(sdk)

module.exports = {
  sdk,
  helpers
}