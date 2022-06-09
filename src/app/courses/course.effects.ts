import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import {
  CourseActionTypes,
  CourseLoadedAction,
  CourseRequestedAction,
} from "./course.action";
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

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
