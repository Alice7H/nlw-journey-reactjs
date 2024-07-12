import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Activity } from "../../types/activity";
import { ActivityHeader } from "../../components/activity-header";
import { ActivityBody } from "../../components/activity-body";

export function Activities() {
  const {tripId} = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities));
  },[tripId])

  return (
    <div className="space-y-8">
      {
        activities.map((category) => (
        <div className="space-y-2.5" key={category.date}>
          <ActivityHeader activityDate={category.date}/>
          {
            category.activities.length > 0
            ? ( category.activities.map(activity => (
              <ActivityBody activity={activity} key={activity.id} />
            )))
            : <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
          }
        </div>
        ))
      }
    </div>
  )
}