export interface ProjectStatData {
  lightBlue: {
    daily: ProjectTimeData,
    week: ProjectTimeData,
    monthly: ProjectTimeData
  },
  singApp: {
    daily: ProjectTimeData,
    week: ProjectTimeData,
    monthly: ProjectTimeData
  },
  rns: {
    daily: ProjectTimeData,
    week: ProjectTimeData,
    monthly: ProjectTimeData
  }
}

export interface ProjectTimeData {
  name: string;
  users: string;
  percent: number,
  registrations: string,
  bounce: string,
  views: string,
  series: [
    {
      name: string,
      data: number[]
    }
  ]
}
