export type Points = {
  ipa: number;
  ips: number;
  mtk: number;
  indo: number;
  olahraga?: number;
  pkn?: number;
};
export interface SiswaInterface {
  name: string;
  points: Points;
}

interface SiswaAverage {
  name: string;
  average: number;
}

class Siswa {
  public siswa: Array<SiswaInterface>;
  constructor(siswa: Array<SiswaInterface>) {
    this.siswa = siswa;
  }
  
  protected calc_sum_of_points(point: Points): { sum: number; count: number } {
    let sum = 0;
    let count = 0;
    let keys = Object.keys(point) as Array<keyof Points>;
    keys.forEach((item: keyof Points) => {
      sum += point[item] ?? 0;
      count+=1;
    });

    return {
      sum,
      count,
    };
  }

  sort_by_points(mode?: "lowest" | "highest"): Array<SiswaInterface> {
    let new_siswa: Array<SiswaInterface> = [];
    this.siswa.forEach((item) => new_siswa.push(item));
    if (mode === "lowest") {
      return new_siswa.sort((a: SiswaInterface, b: SiswaInterface) => {
        let { sum: sum_a } = this.calc_sum_of_points(a.points);
        let { sum: sum_b } = this.calc_sum_of_points(b.points);
        return sum_a - sum_b;
      });
    } else if (mode === "highest") {
      return new_siswa.sort((a: SiswaInterface, b: SiswaInterface) => {
        let { sum: sum_a } = this.calc_sum_of_points(a.points);
        let { sum: sum_b } = this.calc_sum_of_points(b.points);
        return sum_b - sum_a;
      });
    } else {
      return new_siswa;
    }
  }

  sort_by_name(mode?: "asc" | "dsc") {
    let new_siswa: Array<SiswaInterface> = [];
    this.siswa.forEach((item) => new_siswa.push(item));
    if (mode === "asc") {
      return new_siswa.sort((a, b) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        else return 0;
      });
    } else if (mode === "dsc") {
      return new_siswa.sort((a, b) => {
        if (a.name > b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
      });
    } else {
      return new_siswa;
    }
  }

  average_points_siswa(): Array<SiswaAverage> {
    let siswa_avg: Array<SiswaAverage> = [];
    this.siswa.forEach(({ name, points }: SiswaInterface) => {
      let { sum, count } = this.calc_sum_of_points(points);
      siswa_avg.push({
        name,
        average: parseFloat((sum / count).toFixed(2)),
      });
    });
    return siswa_avg;
  }
}

export default Siswa;
