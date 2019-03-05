// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/mapachurro/Documents/Synced Docs/Academic/CWRU Bootcamp/Projects/OpenLease/conf/routes
// @DATE:Mon Mar 04 22:10:49 EST 2019


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
