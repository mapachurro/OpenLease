// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/Owner/Resilio Sync/Synced Docs/Academic/CWRU Bootcamp/Projects/OpenLease/conf/routes
// @DATE:Fri Mar 08 09:31:07 EST 2019

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._

import play.api.mvc._

import _root_.controllers.Assets.Asset
import _root_.play.libs.F

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:6
  FrontendController_1: controllers.FrontendController,
  // @LINE:9
  HomeController_0: controllers.HomeController,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:6
    FrontendController_1: controllers.FrontendController,
    // @LINE:9
    HomeController_0: controllers.HomeController
  ) = this(errorHandler, FrontendController_1, HomeController_0, "/")

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, FrontendController_1, HomeController_0, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix, """controllers.FrontendController.index()"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/summary""", """controllers.HomeController.appSummary"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """""" + "$" + """file<.+>""", """controllers.FrontendController.assetOrDefault(file:String)"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:6
  private[this] lazy val controllers_FrontendController_index0_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_FrontendController_index0_invoker = createInvoker(
    FrontendController_1.index(),
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.FrontendController",
      "index",
      Nil,
      "GET",
      this.prefix + """""",
      """ Serve index page from public directory""",
      Seq()
    )
  )

  // @LINE:9
  private[this] lazy val controllers_HomeController_appSummary1_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/summary")))
  )
  private[this] lazy val controllers_HomeController_appSummary1_invoker = createInvoker(
    HomeController_0.appSummary,
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.HomeController",
      "appSummary",
      Nil,
      "GET",
      this.prefix + """api/summary""",
      """ An example route (Prefix all API routes with apiPrefix defined in application.conf)""",
      Seq()
    )
  )

  // @LINE:12
  private[this] lazy val controllers_FrontendController_assetOrDefault2_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("file", """.+""",false)))
  )
  private[this] lazy val controllers_FrontendController_assetOrDefault2_invoker = createInvoker(
    FrontendController_1.assetOrDefault(fakeValue[String]),
    play.api.routing.HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.FrontendController",
      "assetOrDefault",
      Seq(classOf[String]),
      "GET",
      this.prefix + """""" + "$" + """file<.+>""",
      """ Serve static assets under public directory""",
      Seq()
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:6
    case controllers_FrontendController_index0_route(params@_) =>
      call { 
        controllers_FrontendController_index0_invoker.call(FrontendController_1.index())
      }
  
    // @LINE:9
    case controllers_HomeController_appSummary1_route(params@_) =>
      call { 
        controllers_HomeController_appSummary1_invoker.call(HomeController_0.appSummary)
      }
  
    // @LINE:12
    case controllers_FrontendController_assetOrDefault2_route(params@_) =>
      call(params.fromPath[String]("file", None)) { (file) =>
        controllers_FrontendController_assetOrDefault2_invoker.call(FrontendController_1.assetOrDefault(file))
      }
  }
}
