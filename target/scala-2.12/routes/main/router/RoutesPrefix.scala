// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/Owner/Resilio Sync/Synced Docs/Academic/CWRU Bootcamp/Projects/OpenLease/conf/routes
// @DATE:Tue Mar 05 10:21:35 EST 2019


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
