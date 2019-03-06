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

  def index = Action {
    Ok(views.html.index())
  }

  def newcontract = Action {
    Ok(views.html.newcontract())
  }

  def signup = Action {
    Ok(views.html.signup())
  }
}
