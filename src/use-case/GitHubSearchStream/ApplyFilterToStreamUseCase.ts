// MIT © 2017 azu
import { UseCase } from "almin";
import {
    GitHubSearchStreamRepository,
    gitHubSearchStreamRepository
} from "../../infra/repository/GitHubSearchStreamRepository";
import { AppRepository, appRepository } from "../../infra/repository/AppRepository";
import { SearchFilterFactory } from "../../domain/GitHubSearch/GitHubSearchStream/SearchFilter/SearchFilterFactory";
import { GitHubSearchList } from "../../domain/GitHubSearch/GitHubSearchList/GitHubSearchList";
import { GitHubSearchQuery } from "../../domain/GitHubSearch/GitHubSearchList/GitHubSearchQuery";

export const createApplyFilterToStreamUseCase = () => {
    return new ApplyFilterToStreamUseCase(appRepository, gitHubSearchStreamRepository);
};

export class ApplyFilterToStreamUseCase extends UseCase {
    constructor(
        public appRepository: AppRepository,
        public gitHubSearchStreamRepository: GitHubSearchStreamRepository
    ) {
        super();
    }

    execute(filterWord: string) {
        const app = this.appRepository.get();
        const activeSearch = app.user.activity.activeSearch;
        const activeStream = app.user.activity.activeStream;
        if (!activeStream) {
            return;
        }
        const filters = SearchFilterFactory.create(filterWord);
        activeStream.setFilters(filters);
        if (activeSearch instanceof GitHubSearchList) {
            return this.gitHubSearchStreamRepository.saveWithSearchList(activeStream, activeSearch);
        } else if (activeSearch instanceof GitHubSearchQuery) {
            return this.gitHubSearchStreamRepository.saveWithQuery(activeStream, activeSearch);
        } else {
            return;
        }
    }
}
