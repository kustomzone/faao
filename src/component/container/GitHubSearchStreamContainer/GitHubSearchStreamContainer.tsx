// MIT © 2017 azu
import * as React from "react";
import { SyntheticEvent } from "react";
import { SearchResultList } from "../../project/SearchResultList/SearchResultList";
import { GitHubSearchStreamState } from "../../../store/GitHubSearchStreamStore/GitHubSearchStreamStore";
import { GitHubSearchResultItem } from "../../../domain/GitHubSearch/GitHubSearchStream/GitHubSearchResultItem";
import { BaseContainer } from "../BaseContainer";
import classNames from "classnames";
import { AppState } from "../../../store/AppStore/AppStore";
import { createAppUserOpenItemUseCase } from "../../../use-case/App/AppUserOpenItemUseCase";
import { GitHubSearchStreamCommandBarContainer } from "./GitHubSearchStreamCommandBarContainer/GitHubSearchStreamCommandBarContainer";
import { EmptySearchResultList } from "../../project/EmptySearchResultList/EmptySearchResultList";
import { ProgressColorBar } from "../../project/ProgressColorBar/ProgressColorBar";

export interface GitHubSearchStreamContainerProps {
    className?: string;
    gitHubSearchStream: GitHubSearchStreamState;
    app: AppState;
}

export class GitHubSearchStreamContainer extends BaseContainer<
    GitHubSearchStreamContainerProps,
    {}
> {
    onClickItem = (event: SyntheticEvent<any>, item: GitHubSearchResultItem) => {
        event.preventDefault();
        this.useCase(createAppUserOpenItemUseCase()).executor(useCase => useCase.execute(item));
    };

    render() {
        const list = this.props.gitHubSearchStream.hasResult
            ? <SearchResultList
                  className="GitHubSearchStreamContainer-list"
                  items={this.props.gitHubSearchStream.displayItems}
                  activeItem={this.props.app.activeItem}
                  onClickItem={this.onClickItem}
              />
            : <EmptySearchResultList />;
        const colorBar = this.props.app.activeQuery || this.props.app.activeSearchList
            ? <ProgressColorBar
                  color={
                      this.props.app.activeQuery
                          ? this.props.app.activeQuery.color.hexCode
                          : "#1abc9c"
                  }
                  isCompleted={!this.props.gitHubSearchStream.isLoading}
                  height="3px"
              />
            : null;
        return (
            <div className={classNames("GitHubSearchStreamContainer", this.props.className)}>
                <GitHubSearchStreamCommandBarContainer
                    className="GitHubSearchStreamContainer-header"
                    filterWord={this.props.gitHubSearchStream.filterWord}
                />
                {colorBar}
                <div className="GitHubSearchStreamContainer-main">
                    {list}
                </div>
            </div>
        );
    }
}
