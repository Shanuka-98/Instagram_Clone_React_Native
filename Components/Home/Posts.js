import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Divider, Icon, Image } from "react-native-elements";
import { db, firebase } from "../../firebase";

const PostFooterIcons = [
  {
    name: "Like",
    Like: require("../../Assets/IgHeart2.png"),
    LikedIcon: require("../../Assets/LikedIcon.png"),
  },

  {
    name: "Comment",
    CommentIcon: require("../../Assets/comment.png"),
  },

  {
    name: "Share",
    ShareIcon: require("../../Assets/share.png"),
  },

  {
    name: "Bookmark",
    BookmarkIcon: require("../../Assets/Bookmark.png"),
    BookmarkedIcon: require("../../Assets/Bookmarked.png"),
  },
];

const Posts = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );

    db.collection("users")
      .doc(post.user_Email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      });
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation={"vertical"} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 5,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_image }} style={Styles.dpImage} />
      <Text style={{ color: "black", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <Text
      style={{
        color: "black",
        fontSize: 23,
        transform: [{ rotate: "90deg" }],
        fontWeight: "900",
      }}
    >
      ...
    </Text>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={Styles.LeftFooterIcons}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={Styles.FooterIcons1}
          source={
            post.likes_by_users.includes(firebase.auth().currentUser.email)
              ? PostFooterIcons[0].LikedIcon
              : PostFooterIcons[0].Like
          }
        />
      </TouchableOpacity>
      {/* <PostFooterIcon imgStyle = {Styles.FooterIcons1} imgUrl = {PostFooterIcons[0].imageUrl}/> */}
      <PostFooterIcon
        imgStyle={Styles.FooterIcons2}
        imgUrl={PostFooterIcons[1].CommentIcon}
      />
      <PostFooterIcon
        imgStyle={Styles.FooterIcons3}
        imgUrl={PostFooterIcons[2].ShareIcon}
      />
    </View>
    <View style={Styles.RightFooterIcons}>
      <PostFooterIcon
        imgStyle={Styles.FooterIcons4}
        imgUrl={PostFooterIcons[3].BookmarkIcon}
      />
    </View>
  </View>
);

const PostFooterIcon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={imgUrl} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "black", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 2, flexDirection: "row", flexWrap: "wrap" }}>
    <Text style={{ color: "black" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.Comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.Comments.length > 1 ? " all" : ""} {post.Comments.length}{" "}
        {post.Comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.Comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "black" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>' '
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const Styles = StyleSheet.create({
  dpImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
    resizeMode: "contain",
    objectFit: "contain",
    
  },

  FooterIcons1: {
    width: 30,
    height: 26,
    resizeMode: "contain",
    margin: 2,
    top: -0.5,
  },

  FooterIcons2: {
    width: 30,
    height: 26,
    top: -0.8,
    margin: 2,
    resizeMode: "contain",
  },

  FooterIcons3: {
    width: 30,
    height: 26,
    resizeMode: "contain",
    margin: 2,
    top: -0.5,
  },

  FooterIcons4: {
    width: 30,
    height: 26,
    resizeMode: "contain",
    margin: 2,
    top: 1.5,
  },

  LeftFooterIcons: {
    width: "32%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  RightFooterIcons: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default Posts;
