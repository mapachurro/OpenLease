name := """openlease"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava).settings(
  watchSources ++= (baseDirectory.value / "public/ui/client" ** "*").get
)

resolvers += Resolver.sonatypeRepo("snapshots")


scalaVersion := "2.12.2"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.196"
libraryDependencies += ehcache
libraryDependencies += "org.apache.httpcomponents" % "httpclient" % "4.5.8"