import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [MatButtonModule, MatListModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatListModule, MatProgressSpinnerModule]
})
export class MaterialModule {}
