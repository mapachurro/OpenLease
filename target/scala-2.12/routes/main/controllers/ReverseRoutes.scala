// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/Owner/Resilio Sync/Synced Docs/Academic/CWRU Bootcamp/Projects/OpenLease/conf/routes
// @DATE:Fri Mar 08 09:31:07 EST 2019

import play.api.mvc.Call


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:6
package controllers {

  // @LINE:9
  class ReverseHomeController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:9
    def appSummary(): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + "api/summary")
    }
  
  }

  // @LINE:6
  class ReverseFrontendController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:12
    def assetOrDefault(file:String): Call = {
      
      Call("GET", _prefix + { _defaultPrefix } + implicitly[play.api.mvc.PathBindable[String]].unbind("file", file))
    }
  
    // @LINE:6
    def index(): Call = {
      
      Call("GET", _prefix)
    }
  
  }


}
