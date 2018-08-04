// - Config:
//   - history.plugins.consoleLogging: [Boolean]

if(new RegExp("^true$", "i").test(
  ZConfig.getConfig("history.plugins.consoleLogging"))) {
  historyService.addEventHandler('historyAction', console.dir);
}
