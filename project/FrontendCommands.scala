/**
  * Frontend build commands.
  * Change these if you are using some other package manager. i.e: Yarn
  */
object FrontendCommands {
  val dependencyInstall: String = "npm install"
  val test: String = "npm test"
  val serve: String = "npm run"
  val build: String = "npm run build"
  val start: String = "cd ./ui/client && npm start"
}