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

  const { repoUrl , modificationMessage } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ message: 'Repository URL is required.' });
  }

  const repoName = repoUrl.split('/').pop()?.replace('.git', '') || 'repo';

  try {
    const localPath = path.join('/tmp', repoName);
    console.info("local path" , localPath);
     // Modify the README.md file
     const readmePath = path.join(localPath, 'README.md');
     const readmeContent = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '';
     if (!modificationMessage) {   
        fs.writeFileSync(readmePath, `${readmeContent}\n\nModified By Adaptivist Git Code Manager`);
    }
    else{
      fs.writeFileSync(readmePath, `${readmeContent}\n\n${modificationMessage}`);
    }
 
     // Commit the change
     await git.cwd(localPath)
              .add('./*')
              .commit('Update README.md with Next.js Git Manager app');
    // Push the change
    await git.cwd(localPath).push(repoUrl, 'main');

    return res.status(200).json({ message: 'Changes to the repository are modified and pushed successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}
