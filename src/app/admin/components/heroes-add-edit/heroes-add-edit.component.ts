import { SubmissionFactory } from "../../../others/utilities/submission-factory";
import { Status } from "./../../../shared/enums/status";
import { Submission } from "./../../../shared/models/submission";
import { Router, ActivatedRoute } from "@angular/router";
import { HeroService } from "../../../shared/services/hero.service";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hero } from "../../../shared/models/hero";
import { TimeOptions } from "../../../others/utilities/time-options";
import * as countries from "../../../others/utilities/countries.json";
import { PostsService } from "../../services/posts.service";
import { UserService } from "../../../shared/services/user.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "heroes-add-edit",
  templateUrl: "./heroes-add-edit.component.html",
  styleUrls: ["./heroes-add-edit.component.css"]
})
export class HeroesAddEditComponent implements OnInit {
  heroId;
  hero: Hero;
  form: FormGroup;
  birthDateOptions;
  deathDateOptions;
  countries: any = countries;
  user;
  approved;
  rejected;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private postsService: PostsService,
    private modalService: NgbModal,
    private submissionFactory: SubmissionFactory,
    fb: FormBuilder,
    timeOptions: TimeOptions
  ) {
    this.heroId = this.route.snapshot.params["id"];
    if (this.heroId) {
      this.heroService.get(this.heroId, Status.submissions).subscribe(hero => {
        this.hero = hero;
        this.form.controls.name.setValue(this.hero.name),
          this.form.controls.country.setValue(
            [this.hero.code, this.hero.country].join(",")
          );
        this.form.controls.knownFor.setValue(this.hero.knownFor);
        this.form.controls.achievementDetails.setValue(
          this.hero.achievementDetails
        );
        this.form.controls.birthDate.setValue(this.hero.birthDate);
        this.form.controls.deathDate.setValue(this.hero.deathDate);
        this.form.controls.imageUrl.setValue(this.hero.imageUrl);
      });
    }
    this.form = fb.group({
      name: ["", Validators.required],
      country: ["", Validators.required],
      knownFor: ["", Validators.required],
      achievementDetails: ["", [Validators.required]],
      imageUrl: ["", [Validators.required]],
      birthDate: ["", Validators.required],
      deathDate: ["", Validators.required]
    });

    this.birthDateOptions = timeOptions.birthDateOptions;
    this.deathDateOptions = timeOptions.deathDateOptions;
    this.user = submissionFactory.user;
  }

  ngOnInit() {}

  approve(input) {
    this.submissionFactory.formContentFormat(input);
    let submission = (this.submissionFactory as any).submission;
    this.postsService.action(submission, Status.approved);

    this.approved = true;

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 3000);
  }

  open(content, input) {
    this.modalService.open(content).result.then(
      result => {
        if (result === "yes") {
          this.submissionFactory.formContentFormat(input);
          let submission = (this.submissionFactory as any).submission;
          this.postsService.action(submission, Status.rejected);

          this.rejected = true;

          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 3000);
        }
      },
      reason => {}
    );
  }
}
