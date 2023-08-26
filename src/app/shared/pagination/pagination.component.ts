import { Component, OnInit,
	Input,
	OnChanges,
	Output,
	EventEmitter } from '@angular/core';

  interface Pagination {
    page: number;
    pageSize: number;
    search: string;
    sortColumn: string;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
    maxSize: number;
  }

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() paginationData: any;
	@Output() onPageChanged: EventEmitter<number> = new EventEmitter<number>();

	pagination: Pagination = {
		page: 1,
		pageSize: 50,
		search: "",
		sortColumn: "",
		startIndex: 1,
		endIndex: 10,
		totalRecords: 0,
		maxSize: 0,
	};
	constructor() {}

	ngOnInit(): void {}

	ngOnChanges() {
		this.pagination = this.paginationData;
		this._paginationIndexCalculation();
	}

	onPageChange() {
		this.onPageChanged.emit(this.pagination.page);
		this._paginationIndexCalculation();
	}

	_paginationIndexCalculation() {
		this.pagination.startIndex =
			(this.pagination.page - 1) * this.pagination.pageSize + 1;
		this.pagination.endIndex =
			(this.pagination.page - 1) * this.pagination.pageSize +
			this.pagination.pageSize;
		if (this.pagination.endIndex > this.pagination.totalRecords) {
			this.pagination.endIndex = this.pagination.totalRecords;
		}
		if (this.pagination.startIndex > this.pagination.endIndex) {
			this.pagination.startIndex = this.pagination.endIndex;
		}
	}

}
