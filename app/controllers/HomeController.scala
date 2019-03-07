package controllers

import javax.inject.Inject
import scala.concurrent.Future
import scala.concurrent.duration._

import play.api.mvc._
import play.api.libs.ws._
import play.api.http.HttpEntity

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.stream.scaladsl._
import akka.util.ByteString

import scala.concurrent.ExecutionContext

/**
  * A very small controller that renders a home page.
  */
class HomeController @Inject()(cc: ControllerComponents)
    extends AbstractController(cc) {

  apiClient = new APIClient({
    root: "https://openlaw-instance-with-basic-auth.openlaw.io",
    auth: {
      username: "oliver.renwick@gmail.com",
      password: "Palabra12"
    }
  });

  def index = Action {
    Ok(views.html.index())
  }

  def newcontract = Action {
    Ok(views.html.newcontract())
  }

  def signup = Action {
    Ok(views.html.signup())
  }

  def getDraft = Action.async {
    ws.url(www.openlaw.io/draft/raw/:draftId/:version).get().map { response =>
      Ok(response.body)
    }
  }
  status(wsAction(FakeRequest())) must_== OK



}
