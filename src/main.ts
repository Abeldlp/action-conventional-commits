const { context } = require("@actions/github");
const core = require("@actions/core");
require('dotenv/config')

import isValidCommitMessage from "./isValidCommitMesage";

async function run() {
    core.info(`ℹ️ Checking if your commit message is following the Conventional Commits specification...`
    );

    if (!process.env.COMMIT_MESSAGE) {
        core.info(`No commit to check, skipping...`);
        return;
    }

    let hasErrors;
    core.startGroup("Commit messages:");
    if (isValidCommitMessage(process.env.COMMIT_MESSAGE)) {
        core.info(`✅ ${process.env.COMMIT_MESSAGE}`);
    } else {
        core.info(`🚩 ${process.env.COMMIT_MESSAGE}`);
        hasErrors = true;
    }

    core.endGroup();

    if (hasErrors) {
        core.info("🚫 According to the conventional-commits specification, your commit message is not valid.")
        core.info("Scope must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [scope-enum]")
        core.setFailed("Please follow the guildlines at https://conventionalcommits.org/en/v1.0.0/");
    } else {
        core.info("🎉 Your commit message is following the Conventional Commits specification.");
    }
}

run();
