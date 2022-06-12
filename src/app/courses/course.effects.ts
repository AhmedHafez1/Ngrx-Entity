import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { AppState } from "../reducers";
import {
  AllCoursesLoadedAction,
  AllCoursesRequestedAction,
  CourseActionTypes,
  CourseLoadedAction,
  CourseRequestedAction,
} from "./course.action";
import { allCoursesLoadedSelector } from "./course.selector";
import { CoursesService } from "./services/courses.service";

@Injectable()
export class CourseEffects {
  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<CourseRequestedAction>(CourseActionTypes.CourseRequested),

    mergeMap((action) =>
      this.coursesService.findCourseById(action.payload.courseId)
    ),
    map((course) => new CourseLoadedAction({ course }))
  );

  @Effect()
  loadAllCourses$ = this.actions$.pipe(
    ofType<AllCoursesRequestedAction>(CourseActionTypes.AllCoursesRequested),
    withLatestFrom(this.store.select(allCoursesLoadedSelector)),
    filter(([action, loaded]) => !loaded),
    mergeMap(() => this.coursesService.findAllCourses()),
    map((courses) => new AllCoursesLoadedAction({ courses }))
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<AppState>
  ) {}
}
