package util

import org.scalatest.{ShouldMatchers, FlatSpec}
import org.scalatest.concurrent.ScalaFutures
import Enumerators._
import scala.concurrent.Future
import play.api.libs.iteratee.{Enumerator, Iteratee}

class EnumeratorsTest extends FlatSpec with ShouldMatchers with ScalaFutures {
  "enumerate" should "simply enumerate the list if the function applied lifts the value into a Future" in {
    enumerate(List(1, 2, 3))(Future.successful).run(Iteratee.getChunks).futureValue should equal(List(
      1, 2, 3
    ))
  }

  it should "transform the enumerator with the given function" in {
    enumerate(List(1, 2, 3)) { n =>
      Future {
        n * n
      }
    }.run(Iteratee.getChunks).futureValue should equal(List(1, 4, 9))
  }
}
