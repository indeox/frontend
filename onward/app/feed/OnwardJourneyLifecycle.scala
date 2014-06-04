package feed

import common.{AkkaAsync, Jobs}
import play.api.{ Application => PlayApp, GlobalSettings }

trait OnwardJourneyLifecycle extends GlobalSettings {
  override def onStart(app: PlayApp) {
    super.onStart(app)

    Jobs.deschedule("OnwardJourneyAgentsRefreshJob")
    Jobs.deschedule("OnwardJourneyAgentsRefreshHourlyJob")
    Jobs.deschedule("OnwardJourneyAgentsTestJob")

    Jobs.schedule("OnwardJourneyAgentsTestJob", "0/10 * * * * ?") {
         TopReferrersAgent.update()
         GeoMostPopularAgent.refresh()

    }

      // fire every min
      Jobs.schedule("OnwardJourneyAgentsRefreshJob", "0 * * * * ?") {
        LatestContentAgent.update()
        MostPopularAgent.refresh()
        MostPopularExpandableAgent.refresh()
      }

      // fire every hour
      Jobs.schedule("OnwardJourneyAgentsRefreshHourlyJob", "0 0 * * * ?") {
        DayMostPopularAgent.refresh()
      }

      AkkaAsync {
        TopReferrersAgent.update()
      }

      AkkaAsync {
        LatestContentAgent.update()
        MostPopularAgent.refresh()
        MostPopularExpandableAgent.refresh()
        GeoMostPopularAgent.refresh()
      }

      AkkaAsync{
        // kick off refresh now, as this happens hourly
        DayMostPopularAgent.refresh()
      }
  }

  override def onStop(app: PlayApp) {
    Jobs.deschedule("OnwardJourneyAgentsRefreshJob")
    Jobs.deschedule("OnwardJourneyAgentsRefreshHourlyJob")
    Jobs.deschedule("OnwardJourneyAgentsTestJob")


    LatestContentAgent.stop()
    MostPopularAgent.stop()
    MostPopularExpandableAgent.stop()
    GeoMostPopularAgent.stop()
    DayMostPopularAgent.stop()
    TopReferrersAgent.stop()

    super.onStop(app)
  }
}
