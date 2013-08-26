package code.test.cucumber

import cucumber.api.scala.{ScalaDsl, EN}
import org.scalatest.concurrent.Eventually._
import org.scalatest.concurrent.Eventually.PatienceConfig
import org.scalatest.matchers.ShouldMatchers
import org.scalatest.selenium.WebBrowser
import code.test.cucumber.pages.{StaticContentPage, Homepage}
import org.scalatest.time.SpanSugar
import org.openqa.selenium.{Platform, WebDriver}
import org.openqa.selenium.htmlunit.HtmlUnitDriver
import code.test.selenium.WebDriverFactory
import org.openqa.selenium.remote.{BrowserType, DesiredCapabilities}

// TODO: Abstract out the HtmlUnit mixin so that different drivers may be used (for go, find, etc.)
// TODO: Abstract out the host so that tests can be run in different environments
// TODO: Probably need a better PageObject abstraction here
class HelloWorldWebSteps extends ScalaDsl with EN with WebBrowser with ShouldMatchers with SpanSugar {
  private val host = "http://localhost:8080"
  private val pagesByIdentifier = Map("home" -> Homepage,
                                      "Static Content" -> StaticContentPage)
  private val pagesByPath = Map(Homepage.path -> Homepage,
                                StaticContentPage.path -> StaticContentPage)

  implicit val patienceConfig = PatienceConfig(2 seconds, 250 millis)      // Timeout and poll interval for eventually
  private val desiredCapabilities = new DesiredCapabilities() { setBrowserName(BrowserType.HTMLUNIT) }
  implicit val webDriver: WebDriver = new WebDriverFactory().createDriver(desiredCapabilities)

  Given("^I have browsed to the (.*) page") {
    (pageIdentifier: String) => {
      val pagePath = pagesByIdentifier(pageIdentifier).path
      go to s"$host$pagePath"
    }
  }

  When("""^I click the "(.*)" link$""") {
    (theLinkText: String) => {
      val element = eventually { find(linkText(theLinkText)) }
      element match {
        case Some(link) => click on link
        case None => fail(s"Could not find link: $theLinkText.")
      }
    }
  }

  Then("^I should see the (.*) text$") {
    (textIdentifier: String) => {
      val currentPage = pagesByPath(currentPath)
      val actualTextToFind = currentPage.text(textIdentifier)
      val textOnPage = eventually { find(xpath(s"//*[contains(normalize-space(text()), '$actualTextToFind')]")) }
      textOnPage should be ('defined)
    }
  }

  Then("^I should see the (.*) page") {
    (pageIdentifier: String) => {
      val pagePath = pagesByIdentifier(pageIdentifier).path
      currentUrl should be (s"$host$pagePath")
    }
  }

  def currentPath = {
    val regex = host.r
    regex replaceFirstIn(currentUrl, "")
  }
}