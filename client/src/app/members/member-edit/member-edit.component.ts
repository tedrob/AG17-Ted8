import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GalleryItem, GalleryModule } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule, FormsModule, ToastrModule],
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  providers: [ToastrService],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | null = null;
  images: GalleryItem[] = [];

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('Profile updated successfully', '', {
          positionClass: 'toast-bottom-right',
        });
        this.editForm?.reset(this.member);
      },
    });
  }
}
