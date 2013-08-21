name := "Selenium tests for Promoter website"

version := "0.0.1"

organization := "com.gravy"

scalaVersion := "2.10.0"

resolvers ++= Seq("maven-central-repo" at "http://repo1.maven.org/maven2",
                  "snapshots"     at "http://oss.sonatype.org/content/repositories/snapshots")

scalacOptions ++= Seq("-deprecation", "-unchecked")

libraryDependencies ++= {
    Seq("junit" % "junit" % "4.11",
        "org.scalatest" % "scalatest_2.10" % "2.0.M5b",
        "info.cukes" % "cucumber-scala" % "1.1.3",
        "org.seleniumhq.selenium" % "selenium-server" % "2.35.0"
    )
}