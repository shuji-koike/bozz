import { GithubItemFragmentIssue } from "../types/GithubItemFragmentIssue"
import { GithubItemFragmentOrganization } from "../types/GithubItemFragmentOrganization"
import { GithubItemFragmentPullRequest } from "../types/GithubItemFragmentPullRequest"
import { GithubItemFragmentRepository } from "../types/GithubItemFragmentRepository"
import { GithubItemFragmentUser } from "../types/GithubItemFragmentUser"
import QueryMilestones from "../types/QueryMilestones"
import UserPileFragment from "../types/UserPileFragment"

export type GithubFragment =
  | GithubItemFragmentOrganization
  | GithubItemFragmentUser
  | GithubItemFragmentRepository
  | GithubItemFragmentIssue
  | GithubItemFragmentPullRequest
  | QueryMilestones.QueryMilestones_repository_milestones_nodes
  | QueryMilestones.QueryMilestones_repository_milestones_nodes_issues_nodes
  | QueryMilestones.QueryMilestones_repository_milestones_nodes_pullRequests_nodes
  | UserPileFragment.UserPileFragment_issues_nodes
  | UserPileFragment.UserPileFragment_issues_nodes
