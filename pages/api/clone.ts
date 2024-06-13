import { NextApiRequest, NextApiResponse } from 'next';
import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';

const git = simpleGit();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  console.info("local path");

  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ message: 'Repository URL is required.' });
  }

  const repoName = repoUrl.split('/').pop()?.replace('.git', '') || 'repo';

  try {
    const localPath = path.join('/tmpGitClonePath', repoName);
    console.info("local path" , localPath);

    // if already directory exist , remove that directory and clone
    if(fs.existsSync(localPath)){
        console.log("path exist");
        fs.rmSync(localPath , { recursive: true, force: true })
    }

    // Clone the repository
    await git.clone(repoUrl, localPath);
    return res.status(200).json({ message: 'Repository cloned successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}
