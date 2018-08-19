// - Config:
//   - history.plugins.consoleLogging: [Boolean]

if(ZConfig.getBooleanConfig("history.plugins.consoleLogging")) {
  historyService.addEventHandler('historyAction', console.dir);
}
