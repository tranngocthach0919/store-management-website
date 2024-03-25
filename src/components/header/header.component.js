
const Header = ({ dataUser }) => {
    return (
        <div className="m-4">
            <span className="font-bold text-2xl text-gray-500">Xin chào, {dataUser?.username}</span>
        </div>
      );
}

export default Header;