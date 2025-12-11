async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <div>username: {username}</div>;
}

export default UserPage;
