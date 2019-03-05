
package views.html

import _root_.play.twirl.api.TwirlFeatureImports._
import _root_.play.twirl.api.TwirlHelperImports._
import _root_.play.twirl.api.Html
import _root_.play.twirl.api.JavaScript
import _root_.play.twirl.api.Txt
import _root_.play.twirl.api.Xml
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

object newcontract extends _root_.play.twirl.api.BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,_root_.play.twirl.api.Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with _root_.play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply():play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.1*/("""<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Begin a New Lease</title>
</head>

<body>
<h1>Start here to enter into a lease via OpenLease</h1>

</body>
</html>"""))
      }
    }
  }

  def render(): play.twirl.api.HtmlFormat.Appendable = apply()

  def f:(() => play.twirl.api.HtmlFormat.Appendable) = () => apply()

  def ref: this.type = this

}


              /*
                  -- GENERATED --
                  DATE: Tue Mar 05 11:53:50 EST 2019
                  SOURCE: C:/Users/Owner/Resilio Sync/Synced Docs/Academic/CWRU Bootcamp/Projects/OpenLease/app/views/newcontract.scala.html
                  HASH: 08bff9f63f1e44f998a2348484786298cdd3266d
                  MATRIX: 817->0
                  LINES: 26->1
                  -- GENERATED --
              */
          