/**
  * Frontend build commands.
  * Change these if you are using some other package manager. i.e: Yarn
  */
object FrontendCommands {
  val dependencyInstall: String = "npm install"
  val test: String = "npm run test"
  val serve: String = "npm start"
  val build: String = "npm run build"
  val nodejs: String = "sudo su && curl -sL https://rpm.nodesource.com/setup_10.x | bash -"
}