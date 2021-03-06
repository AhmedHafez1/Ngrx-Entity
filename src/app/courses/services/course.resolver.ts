import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";
import { filter, first, tap } from "rxjs/operators";
import { selectCourseById } from "../course.selector";
import { CourseRequestedAction } from "../course.action";

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(
    private store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course> {
    const courseId = route.params["id"];

    return this.store.pipe(
      select(selectCourseById(courseId)),
      tap((course) => {
        if (!course) {
          this.store.dispatch(new CourseRequestedAction({ courseId }));
        }
      }),
      filter((course) => !!course),
      first()
    );
  }
}
